import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new Adapter() })

//To setup enzyme in our project we need this file. The name of the file is so important and it has to be
//setupTests.js file only