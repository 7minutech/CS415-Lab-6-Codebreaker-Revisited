class MasterMind {

    static codeLength = 4;
    
    static codePegs =  [
        { name: "Green", color: "\u{1F7E2}" },
        { name: "Blue", color: "\u{1F535}" },
        { name: "Red", color: "\u{1F534}" },
        { name: "Yellow", color: "\u{1F7E1}" },
        { name: "Brown", color: "\u{1F7E4}" },
        { name: "Orange", color: "\u{1F7E0}" }
    ];

    static codePegNames = [
        "Green",
        "Blue",
        "Red",
        "Yellow",
        "Brown",
        "Orange"
    ];

    static keyPegBlack = { name: "Black", color: "\u{26AB}" };
    static keyPegWhite = { name: "White", color: "\u{26AA}" };

    constructor() {
        this.buildPegSelectors();
        this.slots = [];
        this.set_slots();
        this.guess_count = 0;
        this.white_pegs = 0;
        this.black_pegs = 0;
        this.code = [];
        this.code_counts = {}
        this.generate_code();
        this.generate_code_counts();
        console.log(this.code);
        this.game_over = false;
        this.guesses = {slot0: null, slot1: null, slot2: null, slot3: null};
    }

    buildPegSelectors () {
        for (let i = 0; i < MasterMind.codeLength; ++i) {

            var pegSelectColumn = document.createElement("td");

            var pegSelect = document.createElement("select");
            $(pegSelect).attr({id: "slot" + i, class: "guess"});

            $(pegSelect).append($("<option>", {
                value: -1,
                selected: "selected",
                text: "(select a color)"
            }));

            MasterMind.codePegs.forEach((peg) => {
                $(pegSelect).append($("<option>", {
                    value: peg["name"],
                    text: peg["color"] + " (" + peg["name"] + ")"
                }));
            });
            
            $(pegSelectColumn).append(pegSelect);
            $("#pegslots").append(pegSelectColumn);

        }

    }

    submit_guess() {
        if (!(this.valid_guesses())) {
            alert("Must select a color for each slot");
            return;
        }
        this.reset_white_black_pegs();
        this.set_guesses();
        this.guess_count++;
        this.count_white_black_pegs();
        if (this.black_pegs == MasterMind.codeLength) {
            this.game_over = true;
        }
        if (this.guess_count == 1){
            this.create_result_table_headers();
        }
        this.create_result_table_row();
        if (this.game_over) {
            $("#submit_button").prop({disabled: true});
            $("#output").append($("<p>", {text: "To play again refresh the page"}));
        }
    }

    generate_code() {
        for (let i = 0; i < MasterMind.codeLength; i++){
            let random_index = [(Math.floor(Math.random() * MasterMind.codePegNames.length))];
            this.code.push(MasterMind.codePegNames[random_index]);
        }
    }

    generate_code_counts() {
        this.code.forEach((color) => {
            if (!(color in this.code_counts)){
                this.code_counts[color] = 0;
            }
            this.code_counts[color]++;
        });
    }

    create_result_table_headers () {
        let first_row = $(document.createElement("tr"));
        first_row.append($("<th>", {colspan: 2, rowspan: 2, text: "Row #"}));
        first_row.append($("<th>", {colspan: 4, text: "Code Pegs"}));
        first_row.append($("<th>", {colspan: 4, rowspan: 2, text: "Key Pegs"}));
        $("#result_table").append(first_row)
        let second_row = $(document.createElement("tr"));
        second_row.attr({id: "seperator"});
        for (let i = 1; i < MasterMind.codeLength + 1; i++){
            second_row.append($("<th>", {text: i}));
        }
        $("#result_table").append(second_row);
    }

    create_result_table_row() {
        let row = $(document.createElement("tr"));
        row.append($("<td>", {text: this.guess_count, colspan: 2}));
        for (let guess in this.guesses){
            row.append($("<td>", {text: this.guesses[guess]["color"]}));
        }
        for (let i = 0; i < this.black_pegs; i++){
            row.append($("<td>", {text: "\u{26AB}", colspan: 1}));
        }
        for (let i = 0; i < this.white_pegs; i++){
            row.append($("<td>", {text: "\u{26AA}", colspan: 1}));
        }
        if (this.game_over){
            row.append($("<p>", {text: `You won in ${this.guess_count} guess(es)!`}));
        }
        $("#seperator").after(row);
    }

    get_color(peg_name) {
        for (let i = 0; i < ((MasterMind.codePegs).length); i++){
            let peg = MasterMind.codePegs[i];
            if (peg_name == peg["name"]) {
                return peg["color"];
            }
        }
        throw new Error("Peg name was not found in MasterMind.codePegs");
    }

    set_slots() {
        for (let i = 0; i < MasterMind.codeLength; i++) {
            let current_slot = $("#slot" + i);
            this.slots.push(current_slot);
        }
    }

    set_guesses() {
        this.slots.forEach((slot, i) => {
            this.guesses["slot" + i] = {name: slot.val(), color: this.get_color(slot.val())};
        });

    }

    valid_guesses() {
        return this.slots.every(slot => slot.val() != "-1");
    }

    count_white_black_pegs() {
        let tmp_code_counts = { ...this.code_counts };
        Object.keys(this.guesses).forEach((key, index) => {
            let guess_color = this.guesses[key]["name"];
            if (guess_color == this.code[index]){
                this.black_pegs++;
                tmp_code_counts[guess_color]--;
            }
            else if (this.code.includes(guess_color) && tmp_code_counts[guess_color] > 0) {
                this.white_pegs++;
                tmp_code_counts[guess_color]--;
            }
        })
    }

    reset_white_black_pegs() {
        this.white_pegs = 0;
        this.black_pegs = 0;
    }
}

$(document).ready(function() {
    let myGame = new MasterMind("name")
    const btn = $("#submit_button")
    btn.on("click", () => myGame.submit_guess());
});
