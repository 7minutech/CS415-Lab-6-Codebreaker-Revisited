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
            this.state = {
                slots: [], guess_count: 0, white_pegs: 0, black_pegs: 0, code: [], code_counts: {},
                game_over: false, guesses: {slot0: null, slot1: null, slot2: null, slot3: null}
            }
            // client code 
            // this.buildPegSelectors();
            // this.setSlots();
            this.generate_code();
            this.generate_code_counts();
            console.log(this.code);
        }

        generateCode() {
            for (let i = 0; i < codeLength; i++){
                let random_index = [(Math.floor(Math.random() * codePegNames.length))];
                this.state.code.push(codePegNames[random_index]);
            }
        }

        generateCodeCounts() {
            this.state.code.forEach((color) => {
            if (!(color in this.state.code_counts)){
                this.state.code_counts[color] = 0;
            }
                this.state.code_counts[color]++;
            });
        }

        onClick = () => {

        }

        handlePegSelectorChange = () => {

        }

        render() {
            
        }
    }