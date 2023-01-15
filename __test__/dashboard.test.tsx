import Dashboard from "../pages/dashboard";
import { render, screen } from "@testing-library/react";
import { useSession, signIn, signOut } from 'next-auth/react';

jest.mock("next-auth/react")

const mockUseSession = useSession as jest.Mock

describe("Dashboard", () => {
  it("xxx", async () => {
    mockUseSession.mockReturnValueOnce([null, false])

    render(<Dashboard />)
    expect(screen.getByText('Dashboard1')).toBeInTheDocument()
  })
})