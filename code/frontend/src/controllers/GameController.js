

export function updatePlayerRecord(data) {
    fetch('https://www.michaelwoodruffdev.com/api/user/updateHistory', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            username: data.username,
            result: data.result
        })
    })
        .then(res => res.text())
        .then(res => res);
}

export function getLeaderboards() {
    return fetch('https://www.michaelwoodruffdev.com/api/user/getusers', {
        method: 'get',
    })
        .then(res => res.json())
        .then(res => {
            let sortedRankings = res.sort((a, b) => (b.ratio > a.ratio ? 1 : -1));
            let mappedSortedRankings = sortedRankings.map(r => {
                r.ratio = (Math.round(r.ratio * 1000)) / 1000;
                return r;
            });
            return mappedSortedRankings;
        });
}

export function getProfile(playerId) {

    return fetch(`https://www.michaelwoodruffdev.com/api/user/getuser?playerId=${playerId}`, {
        method: 'get'
    })
        .then(res => res.json());
}

export function getFriends(playerId) {
    return fetch(`https://www.michaelwoodruffdev.com/api/user/getFriends?playerId=${playerId}`, {
        method: 'get', 
        headers: {
            'Content-Type': 'application/json', 
        }
    });
}

export function addFriend(playerId, friend) {
    let bodyToSend = {
        playerId, 
        friend
    };
    return fetch('https://www.michaelwoodruffdev.com/api/user/addFriend', {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(bodyToSend)
    });
}

export function removeFriend(playerId, friend) {
    let bodyToSend = {
        playerId, 
        friend
    };
    return fetch('https://www.michaelwoodruffdev.com/api/user/removeFriend', {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(bodyToSend)
    });
}