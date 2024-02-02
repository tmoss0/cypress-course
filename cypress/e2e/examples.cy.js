describe('Various Examples', () => {
  beforeEach(() => {
    cy.visit('/examples')
  })
  it('multi-page-testing', () => {
    cy.getDataTest('nav-why-cypress').click()
    cy.location('pathname').should('equal', '/')

    cy.getDataTest('nav-overview').click()
    cy.location('pathname').should('equal', '/overview')

    cy.getDataTest('nav-fundamentals').click()
    cy.location('pathname').should('equal', '/fundamentals')

    cy.getDataTest('nav-examples').click()
    cy.location('pathname').should('equal', '/examples')
  })
  it.only('intercepts', () => {
    cy.intercept('POST', 'http://localhost:3000/examples', {
      fixture: 'example.json',
    })
    cy.getDataTest('post-button').click()
  })
  it.only('grudges', () => {
    cy.contains(/add some grudges/i)

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0)
    })

    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('test grudge')
    })

    cy.getDataTest('clear-button').should('not.exist')

    cy.getDataTest('grudge-list-tite').should('have.text', 'Add Some Grudges')

    cy.getDataTest('add-grudge-button').click()

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1)
    })

    cy.getDataTest('grudge-list-title').should('have.text', 'Grudges')

    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('test grudge 2')
    })

    cy.getDataTest('add-grudge-button').click()

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 2)
      cy.get('li').its(0).should('contains.text', 'test grudge')
    })

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').its(0).within(() => {
        cy.get('button').click()
      })
    })

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1)
    })

    cy.getDataTest('clear-button').click()
  })
})
