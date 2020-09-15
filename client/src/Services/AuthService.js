export default {
    login : async user =>{
        console.log(user);
        const res = await fetch('/user/login', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status !== 401)
            return res.json().then(data => data);
        else
            return { isAuthenticated: false, user: { username: "", role: "" } };
    },
    register : async user =>{
        console.log(user);
        const res = await fetch('/user/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },
    logout : async ()=>{
        const res = await fetch('/user/logout');
        const data = await res.json();
        return data;
    },
    isAuthenticated : async ()=>{
        const res = await fetch('/user/authenticated');
        if (res.status !== 401)
            return res.json().then(data => data);
        else
            return { isAuthenticated: false, user: { username: "", role: "" } };
    }

}