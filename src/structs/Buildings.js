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
            price: 20
        },
        {
            id: 3,
            name: 'Bakery',
            price: 50
        },
        {
            id: 4,
            name: 'Farm',
            price: 150
        }
    ],
    getBuildingById (id) {
        return this.list.find((element) => { return element.id === id});
    }
};
