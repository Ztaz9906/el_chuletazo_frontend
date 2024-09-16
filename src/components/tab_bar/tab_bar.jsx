import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

function MyTabs() {
  return (
    <Tabs defaultIndex={0} isFitted variant='enclosed'>
      <TabPanels>
        <TabPanel>
          <p>Productos más vendidos</p>
        </TabPanel>
        <TabPanel>
          <p>Todos los productos</p>
        </TabPanel>
        <TabPanel>
          <p>Carne de Cerdo</p>
        </TabPanel>
        <TabPanel>
          <p>Cerdo Ahumado</p>
        </TabPanel>
        <TabPanel>
          <p>Embutidos</p>
        </TabPanel>
      </TabPanels>
      <TabList>
        <Tab>Productos más vendidos</Tab>
        <Tab>Todos los productos</Tab>
        <Tab>Carne de Cerdo</Tab>
        <Tab>Cerdo Ahumado</Tab>
        <Tab>Embutidos</Tab>
      </TabList>
    </Tabs>
  );
}

export default MyTabs;
