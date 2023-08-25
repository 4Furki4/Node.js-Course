import supertest from "supertest";
import app from "../server";

describe("GET /", () => {
    it("should return Hello World", async () => {
        const response = await supertest(app).get("/")
        expect(response.body.message).toEqual("Hello World")
    })
})