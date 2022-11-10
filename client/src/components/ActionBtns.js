import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ActionBtns = () => (

    <div className='bg-light'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 text-center py-3 my-1'>
            <Button data-bs-toggle='modal' data-bs-target='#addCategoryModal' size="large" variant="outlined">
              <i className='fas fa-plus'></i>  Add Category
            </Button>
          </div>

          <div className='col-md-4 text-center py-3 my-1'>
            <Button data-bs-toggle='modal' data-bs-target='#addFoodModal' size="large" variant="outlined">
              <i className='fas fa-plus'></i> Add Food
            </Button>
          </div>

          <div className='col-md-4 text-center py-3 my-1'>
            <Link to={'vieworders'}>
            <Button size="large" variant="outlined">View Orders</Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
  export default ActionBtns;