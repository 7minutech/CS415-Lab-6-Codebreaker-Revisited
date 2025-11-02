const keyPegBlack = { name: "Black", color: "\u{26AB}" };
const keyPegWhite = { name: "White", color: "\u{26AA}" };

class OutputCodes extends React.Component {

    constructor(props) {
        super(props);
    }
    

    getPegColor(pegName) {
        for (let i = 0; i < ((this.props.codePegs).length); i++){
            let peg = this.props.codePegs[i];
            if (pegName == peg["name"]) {
                return peg["color"];
            }
        }
        throw new Error("Peg name was not found in MasterMind.codePegs");
    }

    render() {

        const guesses = this.props.guesses;
        const guessKeyPegs = this.props.keyPegCounts;
        const codePegs = this.props.codePegs    
        let winMessage = <p></p>
        let playAgainMessage = <p></p>
        const rows = [];

            if (guesses.length > 0) {

                if (this.props.gameOver) {
                    winMessage = <p>{`You won in ${this.props.guessCount} guess(es)!`}</p>
                    playAgainMessage = <p>{"To play again refresh the page"}</p>
                } 

                for (let i = (guesses.length - 1); i >= 0; --i) {

                    let guess = guesses[i];
                    let pegs = [];
                    let keyPegs = [];
                    let first = false

                    if (i == guesses.length - 1) {
                        first = true
                    }

                    for (let peg in guess) {
                        let pegColor = this.getPegColor(guess[peg])
                        pegs.push(<td>{pegColor}</td>);
                    }

                    let blackPegCount = guessKeyPegs[i]["blackPeg"]
                    let whitePegCount = guessKeyPegs[i]["whitePeg"]
                    for (let i = 0; i < blackPegCount; i++) {
                        keyPegs.push(<td colSpan={1}>{keyPegBlack.color}</td>)
                    }
                    for (let i = 0; i < whitePegCount; i++) {
                        keyPegs.push(<td colSpan={1}>{keyPegWhite.color}</td>)
                    }
                    if (first) {
                        rows.push(<tr><td>{i + 1}</td>{pegs}{keyPegs}{winMessage}</tr>);
                    } else {
                        rows.push(<tr><td>{i + 1}</td>{pegs}{keyPegs}</tr>);
                    }
                }

            return (
                <div>
                    <table>
                        <tr><th rowspan="2">Row #</th><th colspan="4">Code Pegs</th><th rowspan="2" colspan="4">Key Pegs</th></tr>
                        <tr><th>1</th><th>2</th><th>3</th><th>4</th></tr>
                        {rows}
                    </table>
                    {playAgainMessage}
                </div>
            );

        }

    }

}