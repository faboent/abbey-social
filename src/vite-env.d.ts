/// <reference types="vite/client" />
/// <reference types="@chakra-ui/react" />

declare module '@chakra-ui/react' {
  export interface ChakraProps {
    spacing?: number;
    isLoading?: boolean;
  }
}