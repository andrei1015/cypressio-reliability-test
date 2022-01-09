describe('example test', () => {

  it('step', () => {
    cy.request('http://www.randomnumberapi.com/api/v1.0/random?min=1&max=2&count=1').then((response) => {
      console.log(response.body)
    })
  })
})
