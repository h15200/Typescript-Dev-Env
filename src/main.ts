class Printer {
  private text: string;
  constructor(str: string) {
    this.text = str;
  }

  public print(): string {
    return this.text;
  }
}

const printer = new Printer("test");
printer.print();
