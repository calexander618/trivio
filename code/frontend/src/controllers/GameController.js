

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
        .then(res => console.log(res));
}