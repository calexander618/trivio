export function validateInput(input) {
    var pattern = new RegExp("^[a-zA-Z0-9_-]{3,15}$");

    return pattern.test(input);
}