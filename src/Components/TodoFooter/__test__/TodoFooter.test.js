import { render, screen } from '@testing-library/react'

// import component
import TodoFooter from '../TodoFooter'

// 1. Tes container di render atau tidak
test( 'renders  todo footer' , () => {
    // 1. RENDER COMPONENT
    render(<TodoFooter todoLength={5} />)
    // 2. SELECT DOM
    const containerElement = screen.getByTestId('todo-footer-container')
    // 3. EXPECTED RESULT
    expect(containerElement).toBeInTheDocument()
})

// 2. Tes kalau props.todoLength > 0
describe('todo length > 0', () => {

    test( 'render "with-item" message', () => {
        render(<TodoFooter todoLength={5} />)
        // - todo-footer-with-items di render
        const footerWithItemsElement = screen.getByTestId('todo-footer-with-items')
        expect(footerWithItemsElement).toBeInTheDocument()
    } )

    test( 'not render "with-no-item" message', () => {
        render(<TodoFooter todoLength={5} />)
        // - todo-footer-with-items TIDAK di render
        const footerWithNoItemsElement = screen.queryByTestId('todo-footer-no-items')
        expect(footerWithNoItemsElement).not.toBeInTheDocument()
    } )

    // 4. Tes kalau props.todoLength == 1
    describe('todo length == 1', () => {
        test('render "TASK" in singular', () => {
            render(<TodoFooter todoLength={1} />)
            // - todo-footer-with-items berisi text "You have 1 taks"
            const footerWithItemsElement = screen.getByTestId('todo-footer-with-items')
            expect(footerWithItemsElement).toHaveTextContent("You have 1 task")
        })
    })

    // 3. Test kalau props.todoLength > 1
    describe('todo length > 1', () => {
        test('render "TASK" in plural', () => {
            render(<TodoFooter todoLength={5} />)
            // - todo-footer-with-items berisi text "You have {count} tasks"
            const footerWithItemsElement = screen.getByTestId('todo-footer-with-items')
            expect(footerWithItemsElement).toHaveTextContent("You have 5 tasks")
        })
    })
})

// 5. Tes kalau props.todoLength <= 0
describe('todo length <= 0', () => {
    test( 'not render with item message', () => {
        render(<TodoFooter todoLength={0} />)
        // - todo-footer-with-items TIDAK di render text
        const footerWithItemsElement = screen.queryByTestId('todo-footer-with-items')
        expect(footerWithItemsElement).not.toBeInTheDocument()
    
    } )

    test( 'render with no item message', () => {
        render(<TodoFooter todoLength={0} />)
        // - todo-footer-no-items di render
        const footerWithNoItemsElement = screen.getByTestId('todo-footer-no-items')
        expect(footerWithNoItemsElement).toBeInTheDocument()
    } )
})
