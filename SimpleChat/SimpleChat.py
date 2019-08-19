import re


prompts = {
    "what": "What is a video game?",
    "use": "What are video games used for?",
    "companies": "what companies make video games?",
    "long": "how long have video games been out?"

}

responses = {
    "what":  "A video game is an electronic game that involves interaction with a user interface to generate visual feedback on a two- or three-dimensional video display device such as a TV screen, virtual reality headset or computer monitor.",
    "use": "video games are used for entertainment purpouses.",
    "who": "Xbox, PlayStation, and Ninteno are the three major companies that make video games.",
    "long": "the earliest video gamea Cathode ray tube Amusement Device was filed for a patent on 25 January 1947, by Thomas T. Goldsmith Jr. and Estle Ray Mann, and issued on 14 December 1948, as U.S. Patent 2455992."

}


def processInput(userInput):
    userInput = re.sub(r'[^\w\s]', '', userInput)
    words = userInput.split(" ")
    #print(words)
    matchingKeys = []

    for word in words:
        if word in responses.keys():
            matchingKeys.append(word)


    if len(matchingKeys) == 0:
        return "I do not know that"
    elif len(matchingKeys) == 1:
        return responses[matchingKeys[0]]
    else:
        print("I am not sure what you mean. Did you mean: ")
        index = 1

        for key in matchingKeys:
            print(str(index) + ": " + prompts[key])
            index += 1

        valid = False

        while not valid:
            selected = int(input("#: "))

            if selected <= len(matchingKeys) and selected > 0:
                valid = True
            else:
                print("Please enter one of above")
        return responses[matchingKeys[selected - 1]]
    

def main():
    print("Welcome to video game facts! I can tell you about vidio games!\n")
    print("Ask me a question or type in quit\n")

    userInput = ""

    while userInput != "quit":
        userInput = input("what is your question? ").lower()
        #print(userInput)
        if userInput != "quit":
            response = processInput(userInput)
            print(response)

    print("It was nice talking to you. Bye!")




main()

