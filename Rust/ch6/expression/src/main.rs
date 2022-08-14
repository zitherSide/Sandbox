fn main() {
    let apartment = vec!["yudata", "east coat", "amenity"];
    let spots = vec!["202", "102", "202"];

    'search:
    for _room in apartment {
        for spot in &spots {
            if *spot == "102" {
                println!("Found");
                break 'search
            }
        }
    }
    println!("Hello, world!");
}
