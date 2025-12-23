import { render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Feedbacks from "../feedback/page";

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

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === "type") return "";
      if (key === "search") return "";
      return null;
    },
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Server Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Successful Fetch", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    }) as unknown as typeof fetch;

    const ui = await Feedbacks({
      searchParams: Promise.resolve({ type: "bug", search: "" }),
    });
    render(ui);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://rise-frontend-test-api.developer-a6a.workers.dev/?type=bug",
      {
        method: "GET",
        cache: "no-store",
      }
    );

  });

  test("Handle failed fetch ", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve([]),
    }) as unknown as typeof fetch;

    const ui = await Feedbacks({
      searchParams: Promise.resolve({ type: "bug", search: "" }),
    });
    render(ui);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
