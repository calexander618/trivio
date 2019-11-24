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
            if (res.status === 400) {
                console.log("username or password invalid");
                return "invalid";
            } else {
                return res.json();
            }
        })
        .then(res => {
            if (typeof res.token !== 'undefined') {
                localStorage.setItem('trivioLocalStorageToken', res.token);
                localStorage.setItem('trivioLocalStorageUsername', data.username);
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

export async function checkToken() {
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

export function checkLocalStorageForToken() {
    let tokenFromLocalStorage = localStorage.getItem('trivioLocalStorageToken');
    if (tokenFromLocalStorage) {
        store.state.token = tokenFromLocalStorage;
    }
}

export function checkLocalStorageForUsername() {
    let usernameFromLocalStorage = localStorage.getItem('trivioLocalStorageUsername');
    if (usernameFromLocalStorage) {
        store.state.username = usernameFromLocalStorage;
    }
}