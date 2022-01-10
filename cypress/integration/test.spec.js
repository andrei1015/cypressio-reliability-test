Cypress.env('BROWSERSLIST_IGNORE_OLD_DATA')
describe('example test', () => {
  it('step', () => {
    // for what it matters here we are using a random number generator to roughly simulate an inconsistent test, we choose 1 value out of 5 possible, so fail or pass

    cy.request('http://www.randomnumberapi.com/api/v1.0/random?min=1&max=5&count=1').then((response) => {
      console.log(response.body)
      expect(response.body[0]).to.not.equal(1)
    })
  })
})
