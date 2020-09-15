export default {
    saveShoe : async shoe =>{
        const res = await fetch('/shoe/newShoe', {
            method: "post",
            body: JSON.stringify(shoe),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },
    updateShoe : async shoe =>{
        const res = await fetch('/shoe/updateShoe', {
            method: "post",
            body: JSON.stringify(shoe),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },
    deleteShoe: async shoe => {
        const res = await fetch('/shoe/deleteShoe', {
            method: "post",
            body: JSON.stringify(shoe),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },
    getShoes : async () => {
        const res = await fetch('/shoe/getShoes');
        const data = await res.json();
        return data;
    },
}