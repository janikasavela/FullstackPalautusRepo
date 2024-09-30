const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app first page', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Valla',
        username: 'Valla',
        password: 'Valla',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const headingLocator = await page.getByRole('heading', { name: 'Login' })
    await expect(headingLocator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  test('login succeeds with correct credentials', async ({ page }) => {
    await page.getByTestId('username').fill('Valla')
    await page.getByTestId('password').fill('Valla')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Valla logged in')).toBeVisible()
  })

  test('login fails with wrong credentials', async ({ page }) => {
    await page.getByTestId('username').fill('Valla')
    await page.getByTestId('password').fill('Väärä')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('wrong username or password')).toBeVisible()
  })
})

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Valla',
        username: 'Valla',
        password: 'Valla',
      },
    })

    await page.goto('http://localhost:5173')

    await page.getByTestId('username').fill('Valla')
    await page.getByTestId('password').fill('Valla')

    await page.getByRole('button', { name: 'login' }).click()
  })

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'add blog' }).click()
    await page.getByTestId('title').fill('Test Otsikko')
    await page.getByTestId('author').fill('Test Author')
    await page.getByTestId('url').fill('Test Url')
    await page.getByRole('button', { name: 'add' }).click()
    await expect(page.getByText('"Test Otsikko" by Test Author')).toBeVisible()
  })

  test('a blog can be liked', async ({ page }) => {
    await page.getByRole('button', { name: 'add blog' }).click()
    await page.getByTestId('title').fill('Test Otsikko')
    await page.getByTestId('author').fill('Test Author')
    await page.getByTestId('url').fill('Test Url')
    await page.getByRole('button', { name: 'add' }).click()
    await expect(page.getByText('"Test Otsikko" by Test Author')).toBeVisible()

    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await expect(page.getByText('Likes: 1')).toBeVisible()
  })

  test('a blog can be deleted by the user who added it', async ({ page }) => {
    await page.getByRole('button', { name: 'add blog' }).click()
    await page.getByTestId('title').fill('Test Otsikko')
    await page.getByTestId('author').fill('Test Author')
    await page.getByTestId('url').fill('Test Url')
    await page.getByRole('button', { name: 'add' }).click()

    await expect(page.getByText('"Test Otsikko" by Test Author')).toBeVisible()

    await page.getByRole('button', { name: 'view' }).click()

    // Asetetaan kuuntelija dialogille ennen delete-nappia
    page.once('dialog', async (dialog) => {
      await dialog.accept() // Hyväksytään dialogi, kun se tulee
    })

    // Painetaan delete-nappia, joka tuo dialogin esiin
    await page.getByRole('button', { name: 'delete' }).click()

    await expect(
      page.getByText('"Test Otsikko" by Test Author')
    ).not.toBeVisible()
  })

  test('a blog can be ONLY deleted by the user who added it', async ({
    page,
    request,
  }) => {
    await page.getByRole('button', { name: 'add blog' }).click()
    await page.getByTestId('title').fill('Test Otsikko')
    await page.getByTestId('author').fill('Test Author')
    await page.getByTestId('url').fill('Test Url')
    await page.getByRole('button', { name: 'add' }).click()

    await expect(page.getByText('"Test Otsikko" by Test Author')).toBeVisible()

    await page.getByRole('button', { name: 'logout' }).click()

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Uusi',
        username: 'Uusi',
        password: 'Uusi',
      },
    })

    await page.getByTestId('username').fill('Uusi')
    await page.getByTestId('password').fill('Uusi')

    await page.getByRole('button', { name: 'login' }).click()

    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
  })

})
