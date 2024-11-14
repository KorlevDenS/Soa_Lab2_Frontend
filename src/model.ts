export class RequestMessage {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
}

export class Coordinates {
    x: number | undefined;
    y: number | undefined;

    constructor(x?: number, y?: number) {
        this.x = x;
        this.y = y;
    }

}

export class Location {
    x: number | undefined;
    y: number | undefined;
    name: string | undefined;

    constructor(x?: number, y?: number, name?: string) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
}

export class Person {
    name: string | undefined;
    birthday: string | undefined;
    height: number | undefined;
    passportID: string | undefined;
    location: Location | undefined;

    constructor(name?: string, birthday?: string, height?: number, passportID?: string, location?: Location) {
        this.name = name;
        this.birthday = birthday;
        this.height = height;
        this.passportID = passportID;
        this.location = location;
    }
}

export class Product {
    id: number | undefined;
    name: string | undefined;
    coordinates: Coordinates | undefined;
    creationDate: string | undefined;
    price: number | undefined;
    partNumber: string | undefined;
    manufactureCost: number | undefined;
    unitOfMeasure: string | undefined;
    owner: Person | undefined;

    constructor(id?: number, name?: string, coordinates?: Coordinates, creationDate?: string, price?: number,
                partNumber?: string, manufactureCost?: number, unitOfMeasure?: string, owner?: Person) {
        this.id = id;
        this.name = name;
        this.coordinates = coordinates;
        this.creationDate = creationDate;
        this.price = price;
        this.partNumber = partNumber;
        this.manufactureCost = manufactureCost;
        this.unitOfMeasure = unitOfMeasure;
        this.owner = owner;
    }

}