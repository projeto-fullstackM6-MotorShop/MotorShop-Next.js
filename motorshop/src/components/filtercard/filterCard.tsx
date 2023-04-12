import { FilterContext } from "@/contexts/filterContext";
import { useContext } from "react";
import { Text, theme } from '@chakra-ui/react';
import dataCar  from '../../../../dataTeste'


const FilterCard = () => { 

  const { allModels } = useContext(FilterContext)  

  return (
    <>
      <Text fontSize='lg'>Modelo</Text>

      {
        allModels.map((model) => {
          return (
            <Text fontSize='sm' key={model}>{model}</Text>           
          )
        })
      }
    </>
  )
}

export default FilterCard