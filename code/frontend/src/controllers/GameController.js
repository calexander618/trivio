

export function updatePlayerRecord(data) {
    console.log(data);
    fetch('http://localhost:3000/api/user/updateHistory', {
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
    return fetch('http://localhost:3000/api/user/getusers', {
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
    return fetch(`http://localhost:3000/api/user/getuser?playerId=${playerId}`, {
        method: 'get'
    })
        .then(res => res.json());
}