package CMS;


/**
 * Generated from IDL interface "CustomerInfoService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public interface CustomerInfoServiceOperations
{
	/* constants */
	/* operations  */
	CMS.CustomerInfo getCustomer(java.lang.String customerId);
	CMS.CustomerInfo[] searchCustomer(java.lang.String criteria);
	boolean addCustomer(CMS.CustomerInfo customer);
	CMS.CustomerInfo[] getAllCustomer();
}
