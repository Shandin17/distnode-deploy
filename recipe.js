module.exports = class Recipe {
    constructor(id) {
        this.id = Number(id);
        this.name = null;
    }

    async hydrate() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.name = `Recipe: ${this.id}`;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        };
    }
}