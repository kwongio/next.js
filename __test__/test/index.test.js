import {add} from "@/pages/test";

it("더하기 잘되는지 테스트해보기", () => {
    const result = add(10, 20);
    expect(result).toBe(30);
});

describe("나만의 테스트 그룹 만들기", () => {

});