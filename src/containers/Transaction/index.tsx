import KsLayout from '@/layout';
import { TypeInvoices } from '@/query/invoices/get-invoices';
import { Accordion } from '@components/compound';
import LoadingScreen from '@components/compound/LoadingScreen';
import { Button, KaImage, Link } from '@components/primitive';
import { IOrders } from '@interfaces/app';
import {
  Dialog,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
  Stack,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  DialogContent,
} from '@mui/material';
import { changeColor } from '@utils/changeColor';
import { cookieStorage } from '@utils/cookieStorage';
import { decodeToken } from '@utils/decode';
import { format, parseISO, isValid } from 'date-fns';
import { isEmpty, map } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useInvoicesUserQuery } from '../../query/invoices/get-userInvoices';
import CloseIcon from '@mui/icons-material/Close';
import { GroupTextarea } from '@components/compound';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRefundMutation } from '@/query/refund/refundMutation';
import { toast } from 'react-toastify';

function Transaction() {
  const router = useRouter();
  const { query } = router;
  const token = cookieStorage?.getAccessTokenInfo();
  const decoded = decodeToken(token || '');
  // const type = (query?.type as TypeInvoices) || 'all';
  const id = decoded?.id;
  const [status, setStatus] = useState<TypeInvoices>('all');

  const handleChangeType = (event: SelectChangeEvent) => {
    setStatus(event.target.value as TypeInvoices);
  };
  const { data: invoices, isFetching } = useInvoicesUserQuery({ id, type: status });

  const { mutateAsync: refundMutation, isLoading } = useRefundMutation();

  const filterOrdersByType = (orders: IOrders[], type: TypeInvoices) => {
    if (type === 'all') {
      return orders;
    }
    if (type === 'inbound') {
      return orders?.filter((order) => order?.outbound === false);
    }
    if (type === 'outbound') {
      return orders?.filter((order) => order?.outbound === true);
    }
  };

  const filteredOrders = filterOrdersByType(invoices?.order_lists || [], status);

  const [open, openchange] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>('');

  const functionopenpopup = (id: string) => {
    openchange(true);
    setSelection(id);
  };
  const closepopup = () => {
    openchange(false);
  };

  //Formik form
  const { values, errors, touched, setFieldValue, resetForm, handleSubmit, setFieldTouched } =
    useFormik({
      initialValues: {
        message: '',
      },
      validationSchema: Yup.object().shape({
        message: Yup.string()
          .required('Message is required')
          .max(150, 'Just only write 150 characters'),
      }),
      onSubmit: (e) => {
        refundMutation({ order_id: selection, message: e.message }).then((response: any) => {
          toast.success('Send refund successfully, please wait response!', {
            position: 'top-center',
          });
          closepopup();
          resetForm();
        });
      },
    });

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  const handleBlur = ({ name }: { name: string }) => {
    setFieldTouched(name);
  };

  return (
    <KsLayout title="Transaction">
      <div className="kl-transaction">
        {/* Modal Refund */}
        <div className="modal" style={{ textAlign: 'center' }}>
          <Dialog
            classes={{
              root: 'transaction-root',
              container: 'transaction-container',
              paper: 'transaction-paper',
            }}
            // fullScreen
            open={open}
            onClose={closepopup}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle textAlign="center">
              Reason for Refund{' '}
              <IconButton onClick={closepopup} style={{ float: 'right' }}>
                <CloseIcon color="primary"></CloseIcon>
              </IconButton>{' '}
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
              <form
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                onSubmit={handleSubmit}
              >
                <GroupTextarea
                  className="group"
                  placeholder="Enter your message...."
                  name="message"
                  onBlur={handleBlur}
                  fadePlaceholderShown
                  value={values.message}
                  error={errors.message}
                  touched={touched.message}
                  onChange={handleChange}
                />

                <Button
                  type="submit"
                  color="primary"
                  className="button"
                  // onClick={() => handleSubmit}
                  // backgroundHover="dark"
                  // isLoading={isLoading}
                  // disabled={isLoading}
                >
                  Send Your Message
                </Button>
              </form>
            </DialogContent>
            <DialogActions>
              {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
            </DialogActions>
          </Dialog>
        </div>

        <h2 className="title">Transaction History</h2>
        <div className="selection">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={status}
              onChange={handleChangeType}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="all">All Transaction</MenuItem>
              <MenuItem value="inbound">Inbound Transaction</MenuItem>
              <MenuItem value="outbound">Outbound Transaction</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="container-list">
          {!isFetching ? (
            map(filteredOrders, (item) => (
              <Accordion
                className="accordion"
                key={item?.id}
                title={`${format(new Date(Number(item?.paid_at) * 1000), 'dd/MM/yyyy')}`}
              >
                <div className="wrap">
                  <ul className="products-temp">
                    <div className="user-info">
                      <div className="first">
                        <p className="name info">Name: {item?.name}</p>
                        <p className="email info">Email: {item?.email}</p>
                        <p className="phone info">Phone: {item?.phone}</p>
                      </div>

                      <div className="second">
                        <p className="address info">
                          Address:
                          {`${item?.address?.line1}, ${item?.address?.city}, ${item?.address?.country}`}
                        </p>
                        <p className="postal info">Postal Code: {item?.address?.postal_code}</p>
                        <p className="paid info">
                          Paid at: {format(new Date(Number(item?.paid_at) * 1000), 'dd/MM/yyyy')}
                        </p>
                      </div>

                      <div className="third">
                        <p className="sub info">
                          Sub Total:{' '}
                          {(item?.amount_subtotal / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                          })}
                        </p>
                        <p className="shipping-cost info">
                          Shipping Cost:{' '}
                          {(item?.shipping_cost / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                          })}
                        </p>
                        <p className="total info">
                          Total:{' '}
                          {(item?.amount_total / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>

                      {!isEmpty(item?.status) && !isEmpty(item?.required_refund_at) && (
                        <div className="third">
                          <p className="sub info">Status: {item?.status}</p>
                          <p className="shipping-cost info">
                            Refund At:{' '}
                            {isValid(parseISO(item?.required_refund_at))
                              ? format(parseISO(item?.required_refund_at), 'dd/MM/yyyy')
                              : 'Invalid Date'}
                          </p>
                          <p className="total info"></p>
                        </div>
                      )}

                      <div className="fourth">
                        <Button className="btn">
                          <Link className="link" title="" href={item?.invoice_pdf}>
                            Export Invoice
                          </Link>
                        </Button>
                        <Button
                          onClick={() => window.open(item?.invoice_link, '_blank')}
                          className="btn1"
                        >
                          View Invoices Link
                        </Button>
                        {status === 'outbound' ? (
                          <Button
                            disabled={!isEmpty(item?.status)}
                            onClick={() => functionopenpopup(item?.id)}
                            className="btn1"
                          >
                            Refund Product
                          </Button>
                        ) : (
                          <div className="temp"></div>
                        )}
                      </div>
                    </div>

                    {item?.ordered_items &&
                      map(item?.ordered_items, (item, idx) => (
                        <li key={idx} className="items-temp">
                          <KaImage
                            src={item.image}
                            alt="cart"
                            objectFit="contain"
                            ratio="square"
                            className="image-temp"
                          />
                          <div className="info-temp">
                            <div className="name-temp">{item.product_name}</div>
                            <div className="group-temp">
                              <div className="right-empty">
                                <div> {`Qty: ${item.quantity}`}</div>

                                <div> {`Color: ${changeColor(item.color)}`}</div>
                              </div>
                              {/* <div className="price-temp">
                              {(item.price / 100).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 2,
                              })}
                            </div> */}
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </Accordion>
            ))
          ) : (
            <LoadingScreen />
          )}

          {isEmpty(invoices?.order_lists) && !isFetching && (
            <p className="empty-temp">No Transactions.</p>
          )}
        </div>
      </div>
    </KsLayout>
  );
}

export default Transaction;
