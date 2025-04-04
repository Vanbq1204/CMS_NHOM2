package CMS;

import org.omg.PortableServer.POA;

/**
 * Generated from IDL interface "CustomerInfoService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public class CustomerInfoServicePOATie
	extends CustomerInfoServicePOA
{
	private CustomerInfoServiceOperations _delegate;

	private POA _poa;
	public CustomerInfoServicePOATie(CustomerInfoServiceOperations delegate)
	{
		_delegate = delegate;
	}
	public CustomerInfoServicePOATie(CustomerInfoServiceOperations delegate, POA poa)
	{
		_delegate = delegate;
		_poa = poa;
	}
	public CMS.CustomerInfoService _this()
	{
		org.omg.CORBA.Object __o = _this_object() ;
		CMS.CustomerInfoService __r = CMS.CustomerInfoServiceHelper.narrow(__o);
		return __r;
	}
	public CMS.CustomerInfoService _this(org.omg.CORBA.ORB orb)
	{
		org.omg.CORBA.Object __o = _this_object(orb) ;
		CMS.CustomerInfoService __r = CMS.CustomerInfoServiceHelper.narrow(__o);
		return __r;
	}
	public CustomerInfoServiceOperations _delegate()
	{
		return _delegate;
	}
	public void _delegate(CustomerInfoServiceOperations delegate)
	{
		_delegate = delegate;
	}
	public POA _default_POA()
	{
		if (_poa != null)
		{
			return _poa;
		}
		return super._default_POA();
	}
	public boolean addCustomer(CMS.CustomerInfo customer)
	{
		return _delegate.addCustomer(customer);
	}

	public CMS.CustomerInfo[] searchCustomer(java.lang.String criteria)
	{
		return _delegate.searchCustomer(criteria);
	}

	public CMS.CustomerInfo getCustomer(java.lang.String customerId)
	{
		return _delegate.getCustomer(customerId);
	}

	public CMS.CustomerInfo[] getAllCustomer()
	{
		return _delegate.getAllCustomer();
	}

}
