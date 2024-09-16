const inputQuestion = document.getElementById("inputQuestion")
const result = document.getElementById("result")

inputQuestion.addEventListener("keypress", e => {
    if (inputQuestion.value && e.key == "Enter") {
        sendQuestion()
    }
})

const OPENAI_API_KEY = "your_api_key_here"

function sendQuestion() {
    var sQuestion = inputQuestion.value

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: sQuestion }],
            max_tokens: 2048,
            temperature: 0.5,
        })
    })
    .then(res => res.json())
    .then(json => {
        if (result.vaule) result.value += "\n"

        if (json.error?.message) {
            result.value += `Error: ${json.error.message}`
        } else if (json.choices?.[0].text) {
            var text = json.choices[0].text || "Sem resposta"

            result.value += "Chat GPT: " + text
        }

        result.scrollTop = result.scrollHeight
    })
    .catch(err => console.log(`Error: ${err}`))
    .finally(() => {
        inputQuestion.value = ""
        inputQuestion.disabled = false
        inputQuestion.focus()
    })

    if (result.value) result.value += "\n\n\n"

    result.value += `Eu: ${sQuestion}\n`
    inputQuestion.value = "Carregando..."
    inputQuestion.disabled = true

    result.scrollTop = result.scrollHeight
}