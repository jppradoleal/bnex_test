import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavBar from ".";
import * as useAuth from "../../hooks/useAuth";
import * as useUserContext from "../../hooks/useUserContext";
import { ThemeWrapper } from "../../utils/testUtils";

describe("Navbar", () => {
  const useUserContextSpy = vi.spyOn(useUserContext, "default");
  const useAuthSpy = vi.spyOn(useAuth, "default");
  const handleLogout = vi.fn();

  useUserContextSpy.mockReturnValue({
    email: "",
    token: "",
    setEmail: vi.fn(),
    setToken: vi.fn(),
  });

  it("should show products list link", async () => {
    render(<NavBar handleLogout={handleLogout} />, { wrapper: ThemeWrapper });

    const element = await screen.findByTestId("products-list");

    expect(element).toBeDefined();
    expect(element.getAttribute("href")).toBe("/");
  });

  it("should show login link when not authenticated", async () => {
    useAuthSpy.mockReturnValue({ isAuthenticated: false, email: null });

    render(<NavBar handleLogout={handleLogout} />, { wrapper: ThemeWrapper });

    expect(useUserContextSpy).toBeCalled();

    const element = await screen.findByTestId("login");
    expect(element).toBeDefined();
    expect(element.getAttribute("href")).toBe("/login");
  });

  it("should show logout button when authenticated ", async () => {
    useAuthSpy.mockReturnValue({ isAuthenticated: true, email: null });
    render(<NavBar handleLogout={handleLogout} />, { wrapper: ThemeWrapper });

    const element = await screen.findByTestId("logout");
    expect(element).toBeDefined();
  });
  
  it("should call handleDelete when logout button is clicked", async () => {
    useAuthSpy.mockReturnValue({ isAuthenticated: true, email: null });
    render(<NavBar handleLogout={handleLogout} />, { wrapper: ThemeWrapper });
    
    const element = await screen.findByTestId("logout");
    expect(element).toBeDefined();
    
    fireEvent.click(element);
    
    expect(handleLogout).toBeCalled();
  })
});
