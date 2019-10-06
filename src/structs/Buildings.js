export default {
    list: [
        {
            id: 1,
            name: 'Field',
            price: 2
        },
        {
            id: 2,
            name: 'Mill',
            price: 15
        },
        {
            id: 3,
            name: 'Bakery',
            price: 45
        }
    ],
    getBuildingById (id) {
        return this.list.find((element) => { return element.id === id});
    }
};
