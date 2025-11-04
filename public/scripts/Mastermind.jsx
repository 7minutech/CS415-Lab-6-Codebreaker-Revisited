const codeLength = 4;
    
const codePegs =  [
    { name: "Green", color: "\u{1F7E2}" },
    { name: "Blue", color: "\u{1F535}" },
    { name: "Red", color: "\u{1F534}" },
    { name: "Yellow", color: "\u{1F7E1}" },
    { name: "Brown", color: "\u{1F7E4}" },
    { name: "Orange", color: "\u{1F7E0}" }
];

const codePegNames = [
    "Green",
    "Blue",
    "Red",
    "Yellow",
    "Brown",
    "Orange"
];

const testCode1 = ["Red", "Orange", "Green", "Green"]
const testCode2 = ["Blue", "Yellow", "Red", "Green"]
const testCode3 = ["Green", "Yellow", "Yellow", "Yellow"]
const testCode4 = ["Green", "Blue", "Blue", "Green"]
const testCode5 = ["Yellow", "Red", "Blue", "Red"]

const keyPegBlack = { name: "Black", color: "\u{26AB}" };
const keyPegWhite = { name: "White", color: "\u{26AA}" };

class MasterMind extends React.Component {
    constructor(props) {
        super(props)

        let initialCode = [];
        for (let i = 0; i < codeLength; i++){
            let random_index = (Math.floor(Math.random() * codePegNames.length));
            initialCode.push(codePegNames[random_index]);
        }
        console.log(initialCode);
        let initialCodeCount = this.generateCodeCounts(initialCode)

        this.state = {
            guess_count: 0, code: initialCode, code_counts: initialCodeCount, game_over: false,
            guess: {slot0: null, slot1: null, slot2: null, slot3: null}, guesses: [],
            keyPegCount: {}, keyPegCounts: []
        }
    }

    generateCode = () => {
        let newCode = []
        for (let i = 0; i < codeLength; i++){
            let random_index = (Math.floor(Math.random() * codePegNames.length));
            newCode.push(codePegNames[random_index]);
        }        
        let newCodeCount = this.generateCodeCounts(newCode);
        this.setState({code: newCode, code_counts: newCodeCount});
    }

    generateCodeCounts = (code) => {
        let generatedCodeCounts = {};
        code.forEach((color) => {
            if (!(color in generatedCodeCounts)){
                generatedCodeCounts[color] = 0;
            }
            generatedCodeCounts[color] = generatedCodeCounts[color] + 1;
        });
        return generatedCodeCounts;
    }

    onClick = () => {
        if (this.state.game_over) {
            return
        }
        let newKeyPeg = this.count_white_black_pegs()
        let gameOver = this.isGameOver(newKeyPeg);
        if (this.validGuess(this.state.guess)) {
            this.setState((prevState) => ({guess_count: prevState.guess_count + 1, guesses: [...prevState.guesses, prevState.guess], keyPegCount: newKeyPeg, 
                keyPegCounts: [...prevState.keyPegCounts, newKeyPeg], game_over: gameOver}))
        }
    }

    handlePegSelectorChange = (slotNum, pegValue) => {
        let pegSlot = "slot" + slotNum
        this.setState((prevState) => ({guess: {...prevState.guess, [pegSlot]: pegValue}}))
    }

    count_white_black_pegs = () => {
        let tmp_code_counts = { ...this.state.code_counts };
        let blackPegCount = 0
        let whitePegCount = 0
        let checkedPegs = []
        Object.keys(this.state.guess).forEach((key, index) => {
            let guess_color = this.state.guess[key];
            let codeColor = this.state.code[index]
            if (guess_color == codeColor){
                blackPegCount++;
                checkedPegs.push(index)
                tmp_code_counts[guess_color] = tmp_code_counts[guess_color] - 1;
            }
        })

        Object.keys(this.state.guess).forEach((key, index) => {
            if (checkedPegs.includes(index)){
                return;
            }
            let guess_color = this.state.guess[key];
            let codeColor = this.state.code[index]
           if (this.state.code.includes(guess_color) && tmp_code_counts[guess_color] > 0) {
                whitePegCount++;
                tmp_code_counts[guess_color] =  tmp_code_counts[guess_color] - 1;
            }
        })
        return {blackPeg: blackPegCount, whitePeg: whitePegCount}
    }

    isGameOver = (keyPegCount) => {
        return keyPegCount.blackPeg == 4;
    }

    validGuess(guess){
        for (let slot in this.state.guess){
            if (guess[slot] == -1 || guess[slot] === null) {
                return false;
            }
        }
        return true;
    }

    render() {

        let pegSelectors = []
        for (let i = 0; i < codeLength; i++) {
            pegSelectors.push(<PegSelector onChange={this.handlePegSelectorChange} slot={i} />)
        }

        return(
        <div>
            <h1>Welcome to Codebreaker!</h1>
            <p>(For more information about how to play this game, click <a href="howtoplay.html" target="_blank">here</a>.)</p>
                <fieldset>
                    <legend>Enter your guesses here ...</legend>
                    <table>
                        <tr>
                            <th>&nbsp;</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                        </tr>
                        
                        <tr id="pegslots">
                            <td><label>What is your guess?</label></td>
                            {pegSelectors}
                        </tr>

                    </table>
                    <button onClick={this.onClick} disabled={this.state.game_over}>Guess</button>
                </fieldset>
                <OutputCodes keyPegCounts={this.state.keyPegCounts} guesses={this.state.guesses}
                 codePegs={codePegs} guessCount={this.state.guess_count} gameOver={this.state.game_over}/>
        </div>
        )
    }
}