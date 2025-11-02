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

        const rows = [];

            if (guesses.length > 0) {

                for (let i = (guesses.length - 1); i >= 0; --i) {

                    let guess = guesses[i];
                    let pegs = [];
                    let keyPegs = [];

                    for (let peg in guess) {
                        let pegColor = this.getPegColor(guess[peg])
                        pegs.push(<td>{pegColor}</td>);
                    }

                    let blackPegCount = guessKeyPegs[i]["blackPeg"]
                    let whitePegCount = guessKeyPegs[i]["whitePeg"]
                    for (let i = 0; i < blackPegCount; i++) {
                        keyPegs.push(<td>{keyPegBlack.color}</td>)
                    }
                    for (let i = 0; i < whitePegCount; i++) {
                        keyPegs.push(<td>{keyPegWhite.color}</td>)
                    }
                    
                    rows.push(<tr><td>{i + 1}</td>{pegs}<td>{keyPegs}</td></tr>);
                }

            return (
                <table>
                    <tbody>
                        <tr><th rowspan="2">Row #</th><th colspan="4">Code Pegs</th><th rowspan="2" colspan="4">Key Pegs</th></tr>
                        <tr><th>1</th><th>2</th><th>3</th><th>4</th></tr>
                        {rows}
                    </tbody>
                </table>
            );

        }

    }

}