module.exports = {
    Link: ({ children }) => children,
    useRouter: () => ({
      push: jest.fn(),
      back: jest.fn(),
    }),
  };
  