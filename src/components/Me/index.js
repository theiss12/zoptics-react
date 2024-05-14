function Me() {
    const myName = "Zeiss Tamás";
    const myAge = 29;
    const myHobbies = [
        "Programming",
        "Paying the trumpet",
        "Jogging",
    ];

    const hasPets = false;

    const mySelf = {
        name: myName,
        age: myAge,
        hobbies: myHobbies,
        numberOfChildren: 0,
        hasPets
    };
    return (
        <section className="screen-me">
            <h1>
                Adatlap
            </h1>
            <p>
                {/*Edit <code>src/App.js</code> and save to reload.*/}
                {myName}
            </p>

            <h2>
                {myAge}
            </h2>

            {
                myHobbies.map(
                    hobby => <p key={hobby}>{hobby}</p>
                )
            }

            <p>
                Van háziállatom? { mySelf.hasPets ? "igen" : "nem" }
            </p>
        </section>
    );
}

export default Me;