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
        
        let initialCodeCount = this.generateCodeCounts(initialCode)

        this.state = {
            slots: [], guess_count: 0, white_pegs: 0, black_pegs: 0, code: initialCode, code_counts: initialCodeCount,
            game_over: false, guess: {slot0: null, slot1: null, slot2: null, slot3: null}, guesses: []
        }
        // client code 
        // this.buildPegSelectors();
        // this.setSlots();
        // console.log(this.code);
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
        this.incrementGuessCount()
        if (this.validGuess(this.state.guess)) {
            this.setState((prevState) => ({guesses: [...prevState.guesses, prevState.guess]}))
        }
    }

    handlePegSelectorChange = (slotNum, pegValue) => {
        let pegSlot = "slot" + slotNum
        this.setState((prevState) => ({guess: {...prevState.guess, [pegSlot]: pegValue}}))
    }

    validGuess(guess){
        for (let slot in this.state.guess){
            if (guess[slot] == -1) {
                return false;
            }
        }
        return true;
    }

    incrementGuessCount = () => {
        this.setState((previousState) => ({guess_count: previousState.guess_count + 1}))
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
                    <button onClick={this.onClick}>Guess</button>
                </fieldset>
                <OutputCodes codePegs={codePegs} guesses={this.state.guesses}/>
        </div>
        )
    }
}