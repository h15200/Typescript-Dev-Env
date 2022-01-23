class Allocator {
  private max_id: number;
  private minHeap: { id: number; isAllocated: boolean }[] = [];

  constructor(max: number) {
    this.max_id = max;
    for (let i = 1; i <= max; i++) {
      this.minHeap.push({ id: i, isAllocated: false });
    }
  }

  allocate(): number | void {
    if (this.minHeap[0].isAllocated === true) {
      return console.log("all ids are allocated");
    }
    // allocate the first item, then remove from minHeap
    const id = this.minHeap[0].id;
    this.minHeap[0].isAllocated = true;
    this.siftDownFromHead();

    return id;
  }

  private siftDownFromHead(): void {
    let idx = 0;
    const maxNodes = this.minHeap.length - 1;
    while (2 * idx + 1 <= maxNodes) {
      // while left child is still in tree
      const left = 2 * idx + 1;
      const right = 2 * idx + 2; // right child may not exist
      if (
        this.minHeap[left].isAllocated === true &&
        (right > maxNodes || this.minHeap[right].isAllocated === true)
      ) {
        // all ids are allocated
        return;
      }
      if (this.minHeap[left].isAllocated === false) {
        // swap
        [this.minHeap[idx], this.minHeap[left]] = [
          this.minHeap[left],
          this.minHeap[idx],
        ];
        idx = left;
      } else if (this.minHeap[right].isAllocated === false) {
        [this.minHeap[idx], this.minHeap[right]] = [
          this.minHeap[right],
          this.minHeap[idx],
        ];
        idx = right;
      }
    }
  }

  release(id: number): void {
    if (id < 0) return console.log("could not find id");
    for (let i = this.minHeap.length - 1; i >= 0; i--) {
      if (this.minHeap[i].id === id) {
        console.log("found id");
        if (this.minHeap[i].isAllocated === false) {
          return console.log("this id is not allocated");
        } else {
          console.log("turning to false", this.minHeap[i]);
          this.minHeap[i].isAllocated = false;
          this.siftUp(i);
          return;
        }
      }
    }
  }

  private siftUp(index: number): void {
    let curr = index;
    let parent = Math.ceil(curr / 2) - 1;
    // parent is divide by 2 ceil - 1
    while (parent >= 0) {
      if (this.minHeap[parent].isAllocated === false) {
        return;
      } else {
        [this.minHeap[curr], this.minHeap[parent]] = [
          this.minHeap[parent],
          this.minHeap[curr],
        ];
        console.log("swapped");
        console.log(this.minHeap);
        curr = parent;
      }
    }
  }
}

const allocator = new Allocator(10);
console.log(allocator.allocate());
console.log(allocator.allocate());
console.log(allocator.allocate());
console.log(allocator.allocate());
console.log(allocator.allocate());
console.log(allocator.allocate());
console.log(allocator.allocate());
console.log(allocator.allocate());
console.log(allocator.allocate());
console.log(allocator.allocate());
console.log(allocator.release(5));
console.log(allocator.allocate());
