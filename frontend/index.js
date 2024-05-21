async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

  let mentors = await axios.get("http://localhost:3003/api/mentors")
  let learners = await axios.get("http://localhost:3003/api/learners")
  let mentorsRes = mentors.data;
  let learnersRes = learners.data;
  // :point_up_2: ==================== TASK 1 END ====================== :point_up_2:
  // :point_down: ==================== TASK 2 START ==================== :point_down:
  // :brain: Combine learners and mentors.
  // :exclamation: At this point the learner objects only have the mentors' IDs.
  // :exclamation: Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }
  const formattedData = []
  learnersRes.forEach(learner => {
    const result = {
      ...learner,
      mentors: learner.mentors.map(mID => {
        const mentor = mentorsRes.find(mentorObj => mentorObj.id == mID)
        return mentor.firstName + " " + mentor.lastName
      })
    }
    formattedData.push(result)
  })
  // :point_up_2: ==================== TASK 2 END ====================== :point_up_2:
  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'
  // :point_down: ==================== TASK 3 START ==================== :point_down:
  formattedData.forEach(learner => { // looping over each learner object
    // :brain: Flesh out the elements that describe each learner
    // :exclamation: Give the elements below their (initial) classes, textContent and proper nesting.
    // :exclamation: Do not change the variable names, as the code that follows depends on those names.
    // :exclamation: Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // :exclamation: Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // :exclamation: Inspect the mock site closely to understand what the initial texts and classes look like!
    const card = document.createElement('div')
    const heading = document.createElement('h3')
    const email = document.createElement('div')
    const mentorsHeading = document.createElement('h4')
    const mentorsList = document.createElement('ul')
    card.appendChild(heading)
    card.appendChild(email)
    card.appendChild(mentorsHeading)
    learner.mentors.forEach(mentorName => {
      const li = document.createElement('li')
      li.textContent = mentorName
      mentorsList.appendChild(li)
    })
    card.classList.add("card")
    heading.textContent = learner.fullName
    email.textContent = learner.email
    mentorsHeading.textContent = "Mentors"
    mentorsHeading.classList.add('closed')






















    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }
  )
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
