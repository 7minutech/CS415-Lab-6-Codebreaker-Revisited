class OutputDiagram extends React.Component {

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
        const codepegs = this.props.codepegs;

        const rows = [];

            if (guesses.length > 0) {

                for (let i = (guesses.length - 1); i >= 0; --i) {

                    let guess = guesses[i];
                    let pegs = [];

                    for (let peg in guess) {
                        let pegColor = this.getPegColor(guess[peg])
                        pegs.push(<td>{pegColor}</td>);
                    }

                    rows.push(<tr><td>{i + 1}</td>{pegs}<td>{codepegs}</td></tr>);
                }

            return (
                <table>
                    <tbody>
                        <tr><th rowspan="2">Row #</th><th colspan="4">Code Pegs</th><th rowspan="2">Key Pegs</th></tr>
                        <tr><th>1</th><th>2</th><th>3</th><th>4</th></tr>
                        {rows}
                    </tbody>
                </table>
            );

        }

    }

}