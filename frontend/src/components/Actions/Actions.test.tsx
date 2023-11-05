import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Actions from ".";
import React from "react";
import { Table, Tbody, Tr } from "@chakra-ui/react";
import { ThemeWrapper } from "../../utils/testUtils";

interface IWrapperProps {
  children: React.ReactElement;
}

const wrapper = ({ children }: IWrapperProps) =>
  ThemeWrapper({
    children: (
      <Table>
        <Tbody>
          <Tr>{children}</Tr>
        </Tbody>
      </Table>
    ),
  });

describe("Actions", () => {
  const handleDeleteSpy = vi.fn();

  test("should show edit button with aria and icon", () => {
    render(
      <Actions
        handleDelete={() => {}}
        updateLink="/update-product/1"
      ></Actions>,
      { wrapper },
    );

    const element = screen.getByTestId("edit-button");

    expect(element).toBeDefined();
    expect(element.getAttribute("href")).toBe("/update-product/1");
    expect(element.getAttribute("aria-label")).toBe("Editar");
  });
  test("should show delete button with aria and icon", () => {
    render(
      <Actions
        handleDelete={() => {}}
        updateLink="/update-product/1"
      ></Actions>,
      { wrapper },
    );

    const element = screen.getByTestId("delete-button");

    expect(element).toBeDefined();
    expect(element.getAttribute("aria-label")).toBe("Deletar");
  });
  test("should call a function when delete is clicked", () => {
    render(
      <Actions
        handleDelete={handleDeleteSpy}
        updateLink="/update-product/1"
      ></Actions>,
      { wrapper },
    );

    const element = screen.getByTestId("delete-button");

    expect(element).toBeDefined();

    fireEvent.click(element);

    expect(handleDeleteSpy).toBeCalledTimes(1);
  });
});
