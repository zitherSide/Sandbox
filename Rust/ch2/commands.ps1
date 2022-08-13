#cargo --version
#rustc --version
#rustdoc --version
# cargo new --bin hello
# cargo run
#cargo test
#cargo clean

#cargo new --bin iron-gcd

# cargo new --bin mandelbrot

# cargo build --release
Measure-Command {./target/release/mandelbrot mandel.png 4000x3000 -1.20,0.35 -1.0,0.20}