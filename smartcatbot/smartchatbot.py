import requests

responses = {
    "what":  "A video game is an electronic game that involves interaction with a user interface to generate visual feedback on a two- or three-dimensional video display device such as a TV screen, virtual reality headset or computer monitor.",
    "use": "video games are used for entertainment purpouses.",
    "who": "Xbox, PlayStation, and Ninteno are the three major companies that make video games.",
    "long": "the earliest video gamea Cathode ray tube Amusement Device was filed for a patent on 25 January 1947, by Thomas T. Goldsmith Jr. and Estle Ray Mann, and issued on 14 December 1948, as U.S. Patent 2455992."

}
# This function will pass your text to the machine learning model
# and return the top result with the highest confidence
def classify(text):
    key = "d7400340-c2b0-11e9-a971-e3949585133ee0a9abe4-3a6b-4dcf-ad71-3b5d79bd2bf9"
    url = "https://machinelearningforkids.co.uk/api/scratch/"+ key + "/classify"

    response = requests.get(url, params={ "data" : text })

    if response.ok:
        responseData = response.json()
        topMatch = responseData[0]
        return topMatch
    else:
        response.raise_for_status()

def processIntent(intent):
    key = intent["class_name"].lower()
    confidence = intent["confidence"]

    if confidence < 40:
        return "I do not know that"

    if key in responses:
        return responses[key]
    else:
        return "I dont know that"


#response = classify("How long were video games popular")
#print(response)

def main():
    print("Welcome to video game facts! I can tell you about vidio games!\n")
    print("Ask me a question or type in quit\n")

    userInput = ""

    while userInput != "quit":
        userInput = input("what is your question? ").lower()
        #print(userInput)
        if userInput != "quit":
            intent = classify(userInput)
            response = processIntent(intet)
            print(response)

    print("It was nice talking to you. Bye!")




main()

