// R_i = (5R_(i-1) + 1) mod 8192
export function random() {
    const randomStored = localStorage.getItem('r');

    if (randomStored) {
        let newNum = parseInt(randomStored);
        newNum = (5 * newNum + 1) % (2**13);

        localStorage.setItem('r', newNum.toString());
    } else {
        localStorage.setItem('r', '0');
    }
}
