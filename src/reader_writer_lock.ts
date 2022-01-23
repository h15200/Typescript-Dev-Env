// mimic a mutex
// doesn't really work with JS as it's single threaded

enum State {
  LOCKED = "LOCKED",
  UNLOCKED = "UNLOCKED",
}

class Mutex {
  var: any;
  state: State.LOCKED | State.UNLOCKED;
  constructor(globalVar: any) {
    this.var = globalVar;
    this.state = State.UNLOCKED;
  }

  lock() {
    if (this.state === State.LOCKED) {
      throw Error("Mutex is already locked");
    }
    this.state = State.LOCKED;
  }

  unlock() {
    this.state = State.UNLOCKED;
  }

  read() {
    if (this.state === State.LOCKED) {
      throw Error("Locked");
    }
    return this.var;
  }

  write(input: any) {
    if (this.state === State.LOCKED) {
      throw Error("locked");
    }
    this.lock();
    this.var = input;
    this.unlock();
    return "success";
  }
}

const mutex = new Mutex(1);

console.log(mutex.read());
console.log(mutex.read());
console.log(mutex.write(5));
console.log(mutex.read());
