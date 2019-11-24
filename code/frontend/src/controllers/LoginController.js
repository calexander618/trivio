import { store } from '../store.js';

export function signin(data) {
    // make request to sign in
    return fetch("http://localhost:3000/api/user/signin", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status === 404) {
                console.log("username or password invalid");
                return "";
            } else {
                return res.json();
            }
        })
        .then(res => {
            if (typeof res.token !== 'undefined') {
                return res.token;
                // store token here
                //   this.$store.state.token = res.token;
                //   this.$store.state.username = this.username;
                //   this.$router.push('dashboard/lobbyentry');
            }
        });
}

export function signup(data) {
    return fetch("http://localhost:3000/api/user/signup", {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        method: "post"
    });
}

export function checkToken() {
    return fetch('http://localhost:3000/api/user/verifySignin', {
        headers: {
            'Authorization': store.state.token
        },
        method: 'post'
    })
        .then(res => {
            if (res.status === 200) return true;
            else return false;
        });
}
