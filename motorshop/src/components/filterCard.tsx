import { FilterContext } from "@/contexts/filterContext";
import { useContext } from "react";
import { Box, Button, Flex, Input, Text, theme } from '@chakra-ui/react';
import dataCar from '../../../dataTeste'

const FilterCard = () => {
  const { allModels, allMarks, allColors, allYears, allFuels } = useContext(FilterContext)
  return (
    <>
      <Flex justify="start" flexDirection='column' marginLeft={'20px'}>
        <Text
          fontSize='sm'
          fontFamily='heading'
          fontWeight='semibold'
          color={'grey.0'}         
        >Marca</Text>
        <Box marginTop={'5px'}>
          {
            allMarks.map((model) => {
              return (
                <Text
                  fontSize='xs'
                  fontFamily='heading'
                  fontWeight='semibold'
                  color={'grey.3'}
                  key={model}
                  cursor={'pointer'}
                >{model}</Text>
              )
            })
          }
        </Box>
        <Text
          fontSize='sm'
          fontFamily='heading'
          fontWeight='semibold'
          color={'grey.0'}         
        >Modelo</Text>
        <Box marginTop={'5px'}>
          {
            allModels.map((model) => {
              return (
                <Text
                  fontSize='xs'
                  fontFamily='heading'
                  fontWeight='semibold'
                  color={'grey.3'}
                  key={model}
                  cursor={'pointer'}
                >{model}</Text>
              )
            })
          }
        </Box>
        <Text
          fontSize='sm'
          fontFamily='heading'
          fontWeight='semibold'
          color={'grey.0'}         
        >Cor</Text>
        <Box marginTop={'5px'}>
          {
            allColors.map((model) => {
              return (
                <Text
                  fontSize='xs'
                  fontFamily='heading'
                  fontWeight='semibold'
                  color={'grey.3'}
                  key={model}
                  cursor={'pointer'}
                >{model}</Text>
              )
            })
          }
        </Box>
        <Text
          fontSize='sm'
          fontFamily='heading'
          fontWeight='semibold'
          color={'grey.0'}         
        >Ano</Text>
        <Box marginTop={'5px'}>
        {
          allYears.map((model) => {
            return (
              <Text
              fontSize='xs'
                fontFamily='heading'
                fontWeight='semibold'
                color={'grey.3'}
                key={model}
                cursor={'pointer'}
                >{model}</Text>
                )
              })
            }
            </Box>
        <Text
          fontSize='sm'
          fontFamily='heading'
          fontWeight='semibold'
          color={'grey.0'}    
        >Combustível</Text>
        <Box marginTop={'5px'}>

        {
          allFuels.map((model) => {
            return (
              <Text
                fontSize='xs'
                fontFamily='heading'
                fontWeight='semibold'
                color={'grey.3'}
                key={model}
                cursor={'pointer'}
                >{model}</Text>
                )
              })
            }
            </Box>
        <Text
          fontSize='sm'
          fontFamily='heading'
          fontWeight='semibold'
          color={'grey.0'}       
          mb={'5px'}
        >Km</Text>

        <Flex width={'90%'} justify={'space-between'} maxW={'250px'} >
          <Input
            placeholder="Minima"
            fontSize={'xs'}
            type="number"
            background={'grey.4'}
            width={'45%'}
            borderRadius={'3px'}
          ></Input>
          <Input
            placeholder="Máxima"
            fontSize={'xs'}
            type="number"
            background={'grey.4'}
            width={'45%'}
            borderRadius={'3px'}
          ></Input>
        </Flex>
        <Text
          fontSize='sm'
          fontFamily='heading'
          fontWeight='semibold'
          color={'grey.0'}      
          mb={'5px'}
        >Preço</Text>
        <Flex width={'90%'} justify={'space-between'} maxW={'250px'}>
          <Input
            placeholder="Minimo"
            fontSize={'xs'}
            type="number"
            color={'grey.2'}  
            background={'grey.4'}
            width={'45%'}
            borderRadius={'3px'}
          ></Input>
          <Input
            placeholder="Máximo"
            fontSize={'xs'}
            type="number"
            color={'grey.2'}  
            background={'grey.4'}
            width={'45%'}
            borderRadius={'3px'}
          ></Input>
        </Flex>
        <Box width={'100%'} >          
        <Button
          background={'brand.4'}
          color={'brand.1'}
          m={'10px'}
          fontSize={'sm'}
          width={'90%'}
          maxW={'225px'}
          alignSelf={'center'}
          >Ver anúncios</Button>
          </Box>

      </Flex>
    </>
  )
}

export default FilterCard