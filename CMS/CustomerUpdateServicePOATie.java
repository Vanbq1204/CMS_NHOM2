package CMS;

import org.omg.PortableServer.POA;

/**
 * Generated from IDL interface "CustomerUpdateService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public class CustomerUpdateServicePOATie
	extends CustomerUpdateServicePOA
{
	private CustomerUpdateServiceOperations _delegate;

	private POA _poa;
	public CustomerUpdateServicePOATie(CustomerUpdateServiceOperations delegate)
	{
		_delegate = delegate;
	}
	public CustomerUpdateServicePOATie(CustomerUpdateServiceOperations delegate, POA poa)
	{
		_delegate = delegate;
		_poa = poa;
	}
	public CMS.CustomerUpdateService _this()
	{
		org.omg.CORBA.Object __o = _this_object() ;
		CMS.CustomerUpdateService __r = CMS.CustomerUpdateServiceHelper.narrow(__o);
		return __r;
	}
	public CMS.CustomerUpdateService _this(org.omg.CORBA.ORB orb)
	{
		org.omg.CORBA.Object __o = _this_object(orb) ;
		CMS.CustomerUpdateService __r = CMS.CustomerUpdateServiceHelper.narrow(__o);
		return __r;
	}
	public CustomerUpdateServiceOperations _delegate()
	{
		return _delegate;
	}
	public void _delegate(CustomerUpdateServiceOperations delegate)
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
	public void logCustomerChange(java.lang.String customerId, java.lang.String changeType)
	{
_delegate.logCustomerChange(customerId,changeType);
	}

	public boolean updateCustomerInfo(java.lang.String customerId, CMS.CustomerInfo newInfo)
	{
		return _delegate.updateCustomerInfo(customerId,newInfo);
	}

	public boolean updateStatus(java.lang.String customerId, java.lang.String newStatus)
	{
		return _delegate.updateStatus(customerId,newStatus);
	}

}
