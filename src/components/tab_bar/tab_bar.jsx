import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

function MyTabs() {
  return (
    <Tabs defaultIndex={0} isFitted variant='enclosed'>
      <TabList bg="rgba(0, 0, 0, 0.2)">
        <Tab _selected={{ bg: 'main.10', color: 'white' }}>Productos más vendidos</Tab>
        <Tab _selected={{ bg: 'main.10', color: 'white' }}>Todos los productos</Tab>
        <Tab _selected={{ bg: 'main.10', color: 'white' }}>Carne de Cerdo</Tab>
        <Tab _selected={{ bg: 'main.10', color: 'white' }}>Cerdo Ahumado</Tab>
        <Tab _selected={{ bg: 'main.10', color: 'white' }}>Embutidos</Tab>
      </TabList>
    </Tabs>
  );
}

export default MyTabs;

