const {Application} = require('spectron')
const assert = require('assert')
const electronPath = require('electron')
const path = require('path')
const sqlite3 = require('sqlite3')

describe('Application launch', function(){
    this.timeout(10000)

    beforeEach(async function() {
        this.app = new Application({
            path: electronPath,
            args: [path.join(__dirname, '..')]
        })        
        await this.app.start()
    })

    afterEach(async function() {
        if(this.app && this.app.isRunning()){
            await this.app.stop()
        }
    })
    it('shows an initial window', () => {
        return this.app.client.getWIndowCount()
            .then( count => assert.strictEqual(count, 1))
    })
    it('check window title', () => {
        return this.app.client.getTitle()
            .then(title => assert.strictEqual(title, 'Sample App'))
    })
    it('call javascript function', () => {
        return this.app.webContents.executeJavaScript('window.api.updateMsg("ok")')
            .then(res => assert.strictEqual(res, 'ok'))
    })
    it('get DOM textContent', () => {
        const script = `
            document.querySelector("#fld").value = "Hello!";
            action();
            document.querySelector("#msg").textContent;
        `
        return this.app.webContents.executeJavaScript(script)
            .then(res => assert.strictEqual(res, "Hello"))
    })
    it('use form and check message', async () => {
        const msg = await this.app.client.$('#msg')
        const fld = await this.app.client.$('#fld')
        const btn = await this.app.cliend.$('#btn')
        await fld.setValue('Hello!')
        await btn.click()
        const re = await msg.getText()
        return assert.strictEqual(re, 'Hello')
    })
    it("access SQLite3 database", async () => {
        await this.app.client.waitUntilWindowLoaded()
        await this.app.webContents.executeJavaScript('doDB(7)')
        const msg = await this.app.client.$('#msg')
        const re = await msg.getText()
        return assert.strictEqual(re.startWith('{"id:7,'), true)
    })
    it("access SQLite3 directory", () => {
        const dbpath = 'mydata.db'
        const id = 7
        const query =  `select * from users where id = ${id}`
        const db = new sqlite3.Database(dbpath)
        let flg = true
        db.adll(query, (err, rows) => {
            if(err === nul){
                if(rows[0] !== undefined){
                    const r0 = rows[0]
                    console.log(r0)
                    db.close()
                    return assert.strictEqual(r0,id, 1)
                }else{
                    db.close
                    return assert.fail('cannot get record!')
                }
            }else{
                console.log(err,message)
                db.close()
                return assert.fail(err)
            }
        })
    })
})