import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Page from "../feedback/page"; 



interface FeedbackType {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: string;
}

const mockData: FeedbackType[] = [
  {
    name: "Hosh",
    email: "Efih.shreax@gmail.com",
    message: "Shsusjs",
    type: "bug",
  },
  {
    name: "Monisola Adegboye",
    email: "Test@yahoo.com",
    message: "Test feedback. ",
    type: "feature",
  },
  {
    name: "Jeff Ango",
    email: "angojeff433@gmail.com",
    message: "New dashboard design",
    type: "feature",
  },
  {
    name: "mjjh",
    email: "bbbbb@mail.com",
    message: "ghgjhjhjh",
    type: "feature",
  },
  {
    name: "Briar",
    email: "briar@gmail.com",
    message: "Request feature.",
    type: "feature",
  },
  {
    name: "Charles",
    email: "charles@mail.com",
    message: "Finish up Input",
    type: "other",
  },
];

vi.mock("../feedback/_components/Filter", () => ({
  default: () => <div className=""> Filter</div>,
}));

vi.mock("../feedback/_components/Feedbacks", () => ({
  default: () => (
    <div className="">
      {mockData.map((item, index) => (
        <div key={index}>
          <p>{item.name} </p> <p>{item.message} </p> <p>{item.type} </p>{" "}
          <p>{item.email} </p>{" "}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("next/font/google", () => ({
  Geist: () => ({
    variable: "--mock-font",
    className: "mock-font",
  }),
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => (key === "type" ? "bug" : ""),
  }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

const searchParams = Promise.resolve({ type: "bug" });

describe("server component", () => {
  it("renders headline", async () => {
    const component = await Page({ searchParams });
    render(component);
    expect(
      screen.getByText(/Got a complain or feedback\?/i)
    ).toBeInTheDocument();
  });
});
